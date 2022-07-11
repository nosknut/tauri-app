#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{
    fs::{create_dir_all, remove_dir_all, File},
    io::{BufReader, Read, Write},
};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            custom_read_file_function,
            custom_write_file_function,
            replace
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    // main_action().expect("error while running main action");
}

fn main_action() -> std::io::Result<()> {
    let format_file = "./TabExport.KSF";
    let form = custom_read_file_function(format_file).expect("Could not read format file");
    let name_file = "./names.txt";
    let names = custom_read_file_function(name_file).expect("Could not read name file");
    let lines = names.split('\n');

    let mut tabn: usize = 0;
    let mut thing = [
        "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    ];

    remove_dir_all("./KSF").expect("Unable to remove KSF folder");
    create_dir_all("./KSF").expect("Unable to create KSF folder");

    for (i, line) in lines.enumerate() {
        if i % 20 == 0 && i != 0 {
            tabn += 1;
            //writeTab(thing, tabn);
            let name = format!("Tab{}", tabn.to_string());
            let file_name = format!("./KSF/Tab{}", tabn.to_string());
            let x = &name.clone()[..];

            let mut tab_file = File::create(file_name)?;
            let stri = replace(form.clone(), thing, 0)
                .replace("{Count}", "20")
                .replace("{Name}", x);

            tab_file
                .write_all(stri.as_bytes())
                .expect("Unable to write data");
        }
        thing[i % 20] = line
    }

    /*for (i, line) in thing.last().iter().enumerate() {
        if (line == None) {
            i
        }
    }*/
    for (i, tabs) in thing.iter().enumerate() {
        //let mut file = File::create(format!("./out/Tab{}", i))?;
        //file.write_all(b"a");
    }

    Ok(())
}

#[tauri::command]
fn custom_read_file_function(file_path: &str) -> Result<String, String> {
    let file = match File::create(file_path) {
        Ok(file) => file,
        Err(err) => {
            return Err(err.to_string());
        }
    };
    let mut buf_reader = BufReader::new(file);
    let mut contents = String::new();
    match buf_reader.read_to_string(&mut contents) {
        Ok(_) => Ok(contents),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
fn custom_write_file_function(file_path: &str, content: &str) -> Result<(), String> {
    let mut file = match File::create(file_path) {
        Ok(file) => file,
        Err(err) => {
            return Err(err.to_string());
        }
    };

    match file.write_all(content.as_bytes()) {
        Ok(_) => Ok(()),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
fn replace(base: String, tabs: [&str; 20], i: usize) -> String {
    if i >= 20 {
        return base;
    }

    let mut rep = format!("{}{}{}", "{", i + 1, "}");
    //println!("{},{}", rep, tabs[i]);
    return replace(base, tabs, i + 1).replace(&rep, tabs[i]);
}
