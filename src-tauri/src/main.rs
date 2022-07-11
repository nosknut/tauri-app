use std::{
  collections::LinkedList,
  fmt::format,
  fs::{create_dir_all, remove_dir_all, File},
  io::{BufReader, Read, Write},
  str::Split,
};

#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");

    mainAction();
}




fn mainAction() -> std::io::Result<()> {
  let format_file = File::open("./TabExport.KSF")?;
  let form = read_file(format_file);
  let name_file = File::open("./names.txt")?;
  let names = read_file(name_file);
  let lines = names.split('\n');

  let mut tabn: usize = 0;
  let mut thing = [
      "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
  ];

  remove_dir_all("./KSF");
  create_dir_all("./KSF");

  for (i, line) in lines.enumerate() {
      if (i % 20 == 0 && i != 0) {
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

fn read_file(file: File) -> String {
  let mut buf_reader = BufReader::new(file);
  let mut contents = String::new();
  buf_reader.read_to_string(&mut contents);
  return contents;
}

fn replace(base: String, tabs: [&str; 20], i: usize) -> String {
  if (i >= 20) {
      return base;
  }

  let mut rep = format!("{}{}{}", "{", i + 1, "}");
  //println!("{},{}", rep, tabs[i]);
  return replace(base, tabs, i + 1).replace(&rep, tabs[i]);
}
