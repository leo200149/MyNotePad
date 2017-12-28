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