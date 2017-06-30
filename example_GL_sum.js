module.exports = function(company,GL_no,interco_code){
return " "/*--example starts here*/+
"select sum(Amount) as Amount from ["+company+"$G_L Entry] "/*--table_name param company*/+
"where [G_L Account No_] like '"+GL_no+"' "/*--switched for GL_no variable*/+
"and [Global Dimension 1 Code] in ("+interco_code+") "/*--switched for Interco_code variable*/+
" "/*--end*/+
}