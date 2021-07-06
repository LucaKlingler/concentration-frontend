import os
import sys
import time
import keyboard
import datetime
DEFAULT_AVERAGE = 2
AVERAGE_MESSUREMENT_SECONDS = 30
AVERAGE_CONCENTRATION_SECONDS = 30
REMOVAL_KEYS = ['backspace', 'delete']
AFK_COUNTER = 0

def getKey(event):
    global list_of_keys 
    list_of_keys.append(event.name)

def evaluateKeys(list_of_keys):
    '''
    returns amount of pressed keys which append to a text
    and amount of keys which remove from a text
    '''
    amount_appending_keys, amount_removing_keys = 0, 0
    for index in range(len(list_of_keys)):
        if list_of_keys[index] in REMOVAL_KEYS:
            amount_removing_keys+=1
        else:
            if index >=2:
                if list_of_keys[index-1] == list_of_keys[index]:
                    pass
                else: amount_appending_keys+=1
    return amount_appending_keys, amount_removing_keys

def calcPercentage(main, sub):
    if sub > main: return 100
    if main > 0:
        return 100.0/main * sub
    else:
        return 0

def writeConcentration(concentration):
    print(concentration)

def measureAverage():
    global list_of_keys
    list_of_keys = []
    start_time = time.perf_counter()
    while (time.perf_counter() <= (start_time + AVERAGE_MESSUREMENT_SECONDS)):
        keyboard.on_press(getKey)
        time.sleep(1)
    amount_appending_keys, amount_removing_keys= evaluateKeys(list_of_keys)
    if AVERAGE_MESSUREMENT_SECONDS >= 60:
        apending_key_average = amount_appending_keys / (AVERAGE_MESSUREMENT_SECONDS// 60)
        removing_key_average = amount_removing_keys / (AVERAGE_MESSUREMENT_SECONDS// 60)
        if(apending_key_average < DEFAULT_AVERAGE): apending_key_average = DEFAULT_AVERAGE
        return apending_key_average // 2, removing_key_average // 2
    else:
        return amount_appending_keys // 2, amount_removing_keys // 2

def measureConcentration(apending_key_average, removing_key_average):
    global list_of_keys
    global AFK_COUNTER
    list_of_keys = []
    start_time = time.perf_counter()
    while (time.perf_counter() <= (start_time + AVERAGE_CONCENTRATION_SECONDS)):
        keyboard.on_press(getKey)
        time.sleep(1)
    amount_appending_keys, amount_removing_keys= evaluateKeys(list_of_keys)
    if len(list_of_keys) > 0:
        AFK_COUNTER = 0
        #Calc concentration based on average
        less_written = calcPercentage(apending_key_average, amount_appending_keys) <= 0.9
        #more_failures = calcPercentage(removing_key_average, amount_removing_keys) >= 1.1
        writeConcentration(calcPercentage(apending_key_average, amount_appending_keys))
    else:
        AFK_COUNTER += 1
        keyboard.read_key()
    

if __name__ == '__main__':
    writeConcentration(-1)
    apending_key_average, removing_key_average = measureAverage()
    #print(apending_key_average, removing_key_average)
    while(True):
        measureConcentration(apending_key_average, removing_key_average)