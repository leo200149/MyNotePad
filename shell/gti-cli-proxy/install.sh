cp gitproxy.sh ~/gitproxy.sh
gitAlias=$(cat ~/.bash_profile | grep gitproxy.sh)
if [ ${#gitAlias} -eq 0 ]; 
then 
echo "alias git=\"~/gitproxy.sh\"" >>  ~/.bash_profile ; exit
fi
source ~/.bash_profile 
. ~/.bash_profile
echo "install gitproxy finish."