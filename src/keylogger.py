import os
import sys
import time
import keyboard
import datetime
DEFAULT_AVERAGE = 2
AVERAGE_MESSUREMENT_SECONDS = 20
AVERAGE_CONCENTRATION_SECONDS = 5
CONCENTRATION_FILE = 'tmp.log'
FOLDER_NAME = "keylogger"
REMOVAL_KEYS = ['backspace', 'delete']
FILEPATH = "{}/keylogger/{}".format(os.getcwd(), CONCENTRATION_FILE)
AFK_COUNTER = 0
#FILEPATH = "/Users/lucaklingler/Documents/GitHub/captcha/keylogger/tmp.log"

def getKey():
    return time.perf_counter(), keyboard.read_key()

def evaluateKeys(list_of_keys):
    '''
    returns amount of pressed keys which append to a text
    and amount of keys which remove from a text
    '''
    amount_appending_keys, amount_removing_keys = 0, 0
    for time,key in list_of_keys:
        if key in REMOVAL_KEYS:
            amount_removing_keys+=1
        else:
            amount_appending_keys+=1
    return amount_appending_keys, amount_removing_keys

def calcPercentage(main, sub):
    return main  / 100 * sub

def writeConcentration(concentration):
    print(concentration)
    # Append-adds at last
    #file = open(FILEPATH, "a")  # append mode
    file = open(FILEPATH, "w")  # write mode
    file.write("{}\n".format(concentration))
    #file.write("{}\n".format(FILEPATH))
    file.close()

def measureAverage():
    list_of_keys = []
    start_time = time.perf_counter()
    while (time.perf_counter() <= (start_time + AVERAGE_MESSUREMENT_SECONDS)):
        list_of_keys.append(getKey())
    amount_appending_keys, amount_removing_keys= evaluateKeys(list_of_keys)
    if AVERAGE_MESSUREMENT_SECONDS >= 60:
        apending_key_average = amount_appending_keys / (AVERAGE_MESSUREMENT_SECONDS// 60)
        removing_key_average = amount_removing_keys / (AVERAGE_MESSUREMENT_SECONDS// 60)
        if(apending_key_average < DEFAULT_AVERAGE): apending_key_average = DEFAULT_AVERAGE
        return apending_key_average, removing_key_average
    else:
        return amount_appending_keys, amount_removing_keys

def measureConcentration(apending_key_average, removing_key_average):
    print("TEST")
    list_of_keys = []
    start_time = time.perf_counter()
    while (time.perf_counter() <= (start_time + AVERAGE_CONCENTRATION_SECONDS)):
        list_of_keys.append(getKey())
    amount_appending_keys, amount_removing_keys= evaluateKeys(list_of_keys)
    if len(list_of_keys) > 0:
        AFK_COUNTER = 0
        #Calc concentration based on average
        less_written = calcPercentage(apending_key_average, amount_appending_keys) <= 0.9
        more_failures = calcPercentage(removing_key_average, amount_removing_keys) >= 1.1
        if  less_written or  more_failures:
            # open file write concentration 0
            writeConcentration(0)
        else:
            # open file write concentration 1
            writeConcentration(1)
    else:
        AFK_COUNTER += 1
    print(AFK_COUNTER)
    

if __name__ == '__main__':
    if not os.path.exists(FOLDER_NAME):
        os.makedirs(FOLDER_NAME)
    writeConcentration(1)
    apending_key_average, removing_key_average = measureAverage()
    print(apending_key_average, removing_key_average)
    while(True):
        measureConcentration(apending_key_average, removing_key_average)