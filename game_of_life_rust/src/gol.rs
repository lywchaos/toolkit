pub mod gol {
    use std::collections::HashMap;
    use rand::Rng;

    pub enum State {
        Alive,
        Dead,
    }

    pub struct GOL {
        pub height: i32,
        pub width: i32,
        pub field: Vec<Vec<i32>>,
        pub state_map: HashMap<i32, State>,
    }

    impl GOL {
        pub fn new(height: i32, width: i32) -> GOL {
            let mut gol: GOL = GOL {
                height: height,
                width: width,
                field: Vec::new(),
                state_map: HashMap::from([
                    (0, State::Dead),
                    (1, State::Alive),
                ]),
            };
            for i in 0..height {
                let mut row = Vec::new();
                for j in 0..width {
                    row.push(0);
                }
                gol.field.push(row);
            }
            for i in 0..500 {
                let ii = rand::thread_rng().gen_range(0..50);
                let jj = rand::thread_rng().gen_range(0..50);
                gol.field[ii][jj] = 1;
            }
            gol
        }

        pub fn step(&mut self) -> () {
            let mut neighbor = vec![vec![0; self.width as usize]; self.height as usize];
            for i in 0..self.height {
                for j in 0..self.width {
                    let mut cnt = 0;
                    let dir = [-1, 0, 1];
                    for m in dir {
                        for n in dir {
                            if m == 0 && n == 0 {
                                continue;
                            }
                            let ii = i + m;
                            let jj = j + n;
                            let tmp = if ii > -1 && ii < self.field.len() as i32 && jj > -1 && jj < self.field.get(0).unwrap().len() as i32 {self.field[ii as usize][jj as usize]} else {0};
                            cnt += tmp;
                        }
                    }
                    neighbor[i as usize][j as usize] = cnt;
                }
            }

            for i in 0..self.height as usize {
                for j in 0..self.width as usize {
                    if neighbor[i][j] <= 1 && self.field[i][j] == 1 {
                        self.field[i][j] = 0;
                    }
                    else if neighbor[i][j] == 2 {
                        ;
                    }
                    else if neighbor[i][j] == 3 {
                        if self.field[i][j] == 1 {
                            ;
                        }
                        else {
                            self.field[i][j] = 1;
                        }
                    }
                    else {
                        if self.field[i][j] == 1 {
                            self.field[i][j] = 0;
                        }
                    }
                }
            }
        }

        pub fn show(&self) -> () {
            for i in 0..self.height as usize {
                let mut row = String::new();
                for j in 0..self.width as usize {
                    match self.field[i][j] {
                        0 => row.push(' '),
                        1 => row.push('*'),
                        _ => ()
                    }
                }
                println!("{}", row);
            }

        }
    }
}