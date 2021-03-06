echo ------------------------------------------
echo
git log --author="$(git config --get user.name)" --pretty=tformat: --numstat --since=1am \
| gawk '{ add += $1 ; subs += $2 ; loc += $1 - $2 } END { printf "added lines: %s removed lines : %s total lines: %s\n",add,subs,loc }'
echo
echo ------------------------------------------
