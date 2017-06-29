# wrap_sql_in_jsfn_with_params
reads an sql script and writes it to a javascript function that returns said sql script as string, switches out parameters which it then includes in the function call

### how to use:
* move wrap_SQL.js to same location as sql script file you wish to wrap
* adjust filename, parameters and values in top of wrap_SQL.js file 
* save file (Duuh)
* execute in cmd.exe `node wrap_SQL.js`

### why!?
I run a node reporting server that uses [tedious](https://www.npmjs.com/package/tedious) to deliver parameterized data through mailings and websites to internal user.
after wrapping the n-teenth SQL report in quotations and making sure I didnt forget to replace any variables out, I got sick of it. 
I needed this because our company uses an old ERP package that programmatically parameterizes the SQL tablenames. To date I have wrapped ((143-1)/2) SQL queries. I imagine they did this in order to save on SQL database licensing fees. SQL does not allow for tablename paramtererization so was not able to use tedious for all parameters.

### Example

```sql

--example starts here
select sum(Amount) as Amount from [ShowTex Belgie NV$G_L Entry] --table_name param company
where [G_L Account No_] like '777%' --switched for GL_no variable
and [Global Dimension 1 Code] in ('_NVT','') --switched for Interco_code variable
--end


```
```javascript
module.exports = function(company,GL_no,interco_code){
return " "/*--example starts here*/+
"select sum(Amount) as Amount from ["+company+"$G_L Entry] "/*--table_name param company*/+
"where [G_L Account No_] like '"+GL_no+"' "/*--switched for GL_no variable*/+
"and [Global Dimension 1 Code] in ("+interco_code+") "/*--switched for Interco_code variable*/+
" "/*--end*/+
}
```
