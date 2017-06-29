# wrap_sql_in_jsfn_with_params
reads an sql script and writes it to a javascript function that returns said sql script as string, switches out parameters which it then includes in the function call

### how to use:
* move wrap_SQL.js to same location as sql script file you wish to wrap
* adjust filename, parameters and values in top of wrap_SQL.js file 
* save file (Duuh)
* execute in cmd.exe 'node wrap_SQL.js'

### why!?
I run a node reporting server that uses tedious to disperse parameterized reports through mailings and websites to internal user.
after wrapping the n-teenth SQL report in quotations and making sure I didnt forget to replace any variables out, I got sick of it. 
I needed this because our company uses an old ERP package that programmatically parameterizes the SQL tablenames. To date I have wrapped ((143-1)/2) SQL queries. I imagine they did this in order to save on SQL database licensing fees. SQL does not allow for tablename paramtererization so was not able to use tedious for all parameters.
