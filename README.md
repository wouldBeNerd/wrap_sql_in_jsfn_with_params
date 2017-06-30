# wrap_sql_in_jsfn_with_params
reads an sql script file and writes it to a javascript requireable file that returns said sql script as string, switches out parameters which it then includes in the function call

### how to use:
* require wrap_sql
* pass in the following parameters (filename without extension as string, array of parameters array of parameter values to replace)
* execute in cmd.exe `node wrap_SQL.js`

### why!?
I run a node reporting server that uses [tedious](https://www.npmjs.com/package/tedious) to deliver parameterized reports through emails and websites to intranet users.
after wrapping the n-teenth SQL report in quotations and making sure I didnt forget to replace any variables out, I got sick of it. 
I needed this because our company uses an old ERP package that programmatically parameterizes the SQL tablenames. To date I have wrapped ((143-1)/2) SQL queries. SQL does not allow for tablename paramtererization so was not able to use tedious for all parameters.

### Example
SQL Code
```sql

--example starts here
select sum(Amount) as Amount from [Comp Name$G_L Entry] --table_name param company
where [G_L Account No_] like '777%' --switched for GL_no variable
and [Global Dimension 1 Code] in ('_NVT','') --switched for Interco_code variable
--end
```
SQL Code wrapped and parameterized in JS
```javascript
module.exports = function(company,GL_no,interco_code){
return " "/*--example starts here*/+
"select sum(Amount) as Amount from ["+company+"$G_L Entry] "/*--table_name param company*/+
"where [G_L Account No_] like '"+GL_no+"' "/*--switched for GL_no variable*/+
"and [Global Dimension 1 Code] in ("+interco_code+") "/*--switched for Interco_code variable*/+
" "/*--end*/+
}
```
by entering the following parameters at top of wrap_SQL.js file
```javascript
//CONFIG PARAMS (filename, [parameter names], [parameter values to replace])
let wrap_sql = require("wrap_sql")
wrap_sql("GL_sum",//name of import file will be same as export file, extension will be .js
    ["company","GL_no", "interco_code"], //variable/parameter names
    ["Comp Name", "777%", "'_NVT',''"] //values of above parameters to replace 
)
```


