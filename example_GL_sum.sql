
--example starts here
select sum(Amount) as Amount from [Company Name$G_L Entry] --table_name param company
where [G_L Account No_] like '777%' --switched for GL_no variable
and [Global Dimension 1 Code] in ('_NVT','') --switched for Interco_code variable
--end




