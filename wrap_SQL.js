//CONFIG PARAMS (filename, [parameter names], [parameter values to replace])
build_query("GL_sum",//name of import file will be same as export file, extension will be .js
    ["company","GL_no", "interco_code"], //variable/parameter names
    ["Comp Name", "777%", "'_NVT',''"] //values of above parameters to replace 
)
//console.log('\n') //NEW LINE PROBLEMS I TRIED TO USE THE CORRECT METHOD require('os').EOL INSTEAD , but it did not work
function build_query(file_name, variable_arr, value_arr){
    let fs = require('fs'), 
        path = require('path')
    let write_file = fs.createWriteStream(file_name + ".js");
    write_file.on("error", (error)=>{throw error})
    write_file.write("module.exports = function("+variable_arr.join()+"){"+'\n');
    fs.readFile(file_name+'.sql', 'utf8',function(err, lines) {
        replace_values_P(lines, variable_arr, value_arr).then((lines)=>{
            write_file.write("return ")
            str_replace_all(str_replace_all(str_replace_all(lines,"\r", ""),"\t",""),"  ","").split('\n').map((x, i, arr)=>{
                if(x.length > 0) {
                    let comment = ""
                    if(x.indexOf("--")!== -1){
                        comment = "/*" + x.substring(x.indexOf("--"), x.length) + "*/"
                        x = x.substring(0, x.indexOf("--"))
                    }
                    write_file.write(String.fromCharCode(0x0022) + add_end_space(x) + String.fromCharCode(0x0022) + comment + last_line_closer(i, arr.length))
                }
                if(i===arr.length-1) add_suffix(file_name);
            })
        })

    })
    function replace_values_P(lines, variable_arr, value_arr){
        return new Promise(function(resolve, reject){
            let new_lines = lines
            value_arr.map((x,i,arr)=>{
                new_lines = str_replace_all(new_lines, x, String.fromCharCode(0x0022) + "+" +variable_arr[i]+ "+" + String.fromCharCode(0x0022))
                if(i === arr.length-1) resolve(new_lines)
            })
        })
    }
    function add_suffix(file_name){
        write_file.write("}")
        console.log(file_name, " :done")
    }
    function add_end_space(str){
        if(str.substr(str.length - 1) === " ") return str
        else return str + " "
    }
    function last_line_closer(i, max){
        if(i === max-1) return '\n'
        else return "+" + '\n'
    }
    function str_replace_all(long_string, search, replacement){
        let new_string = long_string.replace(search, replacement);
        if(long_string.indexOf(search) > -1){
            return str_replace_all(new_string, search, replacement);
        }else{
            return new_string
        }
    }
}
