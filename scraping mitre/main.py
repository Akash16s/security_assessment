from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import requests

driver = webdriver.Chrome(r'venv\WebDriverManager\chrome\90.0.4430.24\chromedriver_win32\chromedriver.exe')

tacticName=[]  
tacticId = []
technique=[
{'id': 'TA0043', 'name': 'Reconnaissance'}, 
{'id': 'TA0042', 'name': 'Resource Development'}, 
{'id': 'TA0001', 'name': 'Initial Access'}, 
{'id': 'TA0002', 'name': 'Execution'}, 
{'id': 'TA0003', 'name': 'Persistence'}, 
{'id': 'TA0004', 'name': 'Privilege Escalation'}, 
{'id': 'TA0005', 'name': 'Defense Evasion'}, 
{'id': 'TA0006', 'name': 'Credential Access'}, 
{'id': 'TA0007', 'name': 'Discovery'}, 
{'id': 'TA0008', 'name': 'Lateral Movement'}, 
{'id': 'TA0009', 'name': 'Collection'}, 
{'id': 'TA0011', 'name': 'Command and Control'}, 
{'id': 'TA0010', 'name': 'Exfiltration'}, 
{'id': 'TA0040', 'name': 'Impact'}]

for a in range(len(technique)):
    temp = str(technique[a]['id'])
    tempName = technique[a]['name']
    url = "https://attack.mitre.org/tactics/{}".format(temp); 
    driver.get(url)


    content = driver.page_source
    soup = BeautifulSoup(content,features="lxml")

    data = []
    table = soup.find('table', attrs={'class':'table-techniques'})
    table_body = table.find('tbody')

    rows = table_body.find_all('tr')
    for row in rows:
        cols = row.find_all('td')
        cols = [ele.text.strip() for ele in cols]
        data.append([ele for ele in cols if ele])

    for a in data:
        tacticId.append(a[0])
        tacticName.append(a[1])


    df = pd.DataFrame({'Tactic Id':tacticId, 'Tactic Name':tacticName}) 
    df.to_csv(str(tempName)+'.csv', index=False, encoding='utf-8')


