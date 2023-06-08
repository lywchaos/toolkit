mod gol;

use std::time::Duration;
use std::thread;

use std::io::{self, Write};
use gol::gol::*;

fn main() {
    let mut G = GOL::new(50, 50);
    loop {
        println!("===========================================================================");
        G.show();
        G.step();
        thread::sleep(Duration::from_secs(1));
        print!("{}\x1b[2J\x1b[1;1H", 27 as char);  // 发送清空命令
        io::stdout().flush().unwrap();  // 刷新输出缓冲区
    }
}
