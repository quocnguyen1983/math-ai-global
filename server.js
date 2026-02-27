const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/toanlop12")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));
// Tạo Schema
const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Student = mongoose.model("Student", StudentSchema);
// ================= REGISTER =================
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // kiểm tra user đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "Email đã tồn tại!" });
    }

    // mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ message: "Đăng ký thành công!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});
// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Email không tồn tại!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Sai mật khẩu!" });
    }

    res.json({ message: "Đăng nhập thành công!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});
// Route thêm học sinh
app.get("/add", async (req, res) => {
  const student = new Student({
    name: "Nguyen Van A",
    age: 18
  });

  await student.save();
  res.send("Đã thêm học sinh!");
});

// Route xem danh sách
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});
// Test route
app.get("/", (req, res) => {
  res.send("Server đang chạy OK 🚀");
});

app.listen(3001, () => {
  console.log("Server chạy tại http://localhost:3001");
});
