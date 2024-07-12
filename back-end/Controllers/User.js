import UserTest from '../Models/UserSchema.js';
import Employee from '../Models/Employee.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserTest({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email must be unique' });
    }
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserTest.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const dashboard = async (req, res) => {
  try {
    const user = await UserTest.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEmployee = async (req, res) => {
  const { name, email, phone } = req.body;
  const userId = req.userId;

  try {
    const employee = new Employee({ userId, name, email, phone });
    await employee.save();
    res.status(201).send({ message: 'Employee added successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Error adding employee' });
  }
};

const getEmployees = async (req, res) => {
  const userId = req.userId;

  try {
    const employees = await Employee.find({ userId });
    res.status(200).send(employees);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching employees' });
  }
};

const editEmployees = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const userId = req.userId;
  try {
    const employee = await Employee.findByIdAndUpdate(id, { userId, name, email, phone }, { new: true });
    if (!employee) {
      return res.status(404).send({ error: 'Employee not found' });
    }
    res.status(200).send({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(400).send({ error: 'Error updating employee' });
  }
}

const deleteEmployees = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  // console.log(id, userId);
  try {
    const employee = await Employee.findOneAndDelete({ _id: id, userId });
    if (!employee) {
      return res.status(404).send({ error: 'Employee not found or does not belong to this user' });
    }
    res.status(200).send({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Error deleting employee' });
  }
}

export { signup, login, dashboard, getEmployees, addEmployee, editEmployees, deleteEmployees };
