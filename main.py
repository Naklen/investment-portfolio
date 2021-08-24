import eel

def main():
    eel.init('./web/build')
    eel.start('index.html', port=10000)

if __name__ == '__main__':
    main()
