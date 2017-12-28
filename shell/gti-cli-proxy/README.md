# OSX git cmd 簡單代理shell

1. 打開終端機, 執行`install.sh`(僅適用於`bash`)。
2. 重開終端機。
3. `git --version` 測試一下，有出現`======gti proxy=====`即可。

主要執行shell檔將被置於 `~/gitproxy.sh`

若要調整執行內容

```sh
vim ~/gitproxy.sh
```

```sh
echo "=======git proxy====="
PARAMS="$@"
# 條件自行調整及設計,以下為範例而已。
while test $# -gt 0
do
    case "$1" in
        add) echo "add function is lock"
             exit 0 
        ;;
        branch) echo "branch function is lock"
             exit 0 
        ;;
    esac
    shift
done
# 條件自行調整及設計,以上為範例而已。
if [ ${#PARAMS} -gt 0 ]; then /usr/bin/git "$PARAMS" ; exit
else
/usr/bin/git --help
fi
```