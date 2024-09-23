use rand::Rng;

pub fn rand_otp() -> u16 {
    let mut rng = rand::thread_rng();
    rng.gen_range(1000..=9999)
}
