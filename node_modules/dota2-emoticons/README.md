# dota2-emoticons
based on [@rossengeorgiev](https://github.com/rossengeorgiev)'s [Dota 2 notebooks](https://github.com/rossengeorgiev/dota2_notebooks/blob/046e385a787d6f84408bded077c4552064958ee4/List%20Emoticons.ipynb)

## install
to use in node.js project:
```
npm install dota2-emoticons
```

## update
to generate new emoticons u'll need python 3.5+, pip and [imagemagick](https://imagemagick.org/script/download.php).
```sh
# install python deps
$ pip3 install -r requirements.txt

# install imagemagic (macos)
$ brew install imagemagick

# generate emoticos
# common locations:
# macos /Users/<username>/Library/Application Support/Steam/steamapps/common/dota 2 beta;
# linux /home/<username>/.steam/steam/steamapps/common/dota 2 beta;
# windows C:/Program Files (x86)/Steam/SteamApps/common/dota 2 beta.
$ python3 generate.py <dota-path>
```
