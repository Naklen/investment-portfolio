py -m venv virt
"./virt/scripts/activate.bat"
type requirements.txt | pip install
py db_init.py
cd web
npm install
cd ..