import Task from '../models/Task.js';

// @route   GET /api/tasks
// @desc    Get all tasks for user with filtering
// @access  Private
export const getTasks = async (req, res) => {
  try {
    const { status, priority, search, sort } = req.query;
    
    // Build filter object
    const filter = { userId: req.user.id };
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    let sortObj = { createdAt: -1 };
    if (sort === 'due-date') sortObj = { dueDate: 1, createdAt: -1 };
    if (sort === 'priority') sortObj = { priority: 1, createdAt: -1 };

    const tasks = await Task.find(filter).sort(sortObj);

    res.json({
      status: 'success',
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Private
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user owns the task
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this task' });
    }

    res.json({
      status: 'success',
      data: task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/tasks
// @desc    Create new task
// @access  Private
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, tags } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Please provide a title' });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      tags: tags || [],
      userId: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
export const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user owns the task
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    const { title, description, status, priority, dueDate, tags } = req.body;

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, dueDate, tags, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.json({
      status: 'success',
      data: task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user owns the task
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success',
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/tasks/stats/summary
// @desc    Get task statistics for user
// @access  Private
export const getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const priorityStats = await Task.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      status: 'success',
      byStatus: stats,
      byPriority: priorityStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
