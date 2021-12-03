#!/bin/bash

echo "***************"
echo "starting setup"
echo "creating virtual env"
echo "***************"

python3 -m venv venv

echo "***************"
echo "virtual env created"
echo "***************"

source venv/bin/activate

echo "***************"
echo "virtual env activated"
echo "installing requirement"
echo "***************"

cd app
pip install -r requirements.txt 

echo "***************"
echo "requirements.txt installed"
echo "***************"

cd frontend

echo "***************"
echo "**installing package for react***"
echo "***************"

npm install

echo "***************"
echo "building package for react"
echo "***************"

npm run build

echo "***************"
echo "building completed"
echo "***************"

echo "***************"
echo "starting django server"
echo "***************"

cd ..
python3 manage.py runserver