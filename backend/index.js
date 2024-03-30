const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async function (req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // put it in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })
})

// app.get("/todos", async function(req, res) {
//     const todos = await todo.find({});

//     // res.json({
//     //     todos:[]
//     // })
//     res.json({ todos });

// })
app.get("/todos", async function (req, res) {
    try {
        const todos = await todo.find({});
        console.log(todos); // Log todos to console
        res.json({ todos }); // Send the fetched todos in the response
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/completed", async function (req, res) {
    console.log(req.body);
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }

    await todo.updateOne({
        _id: req.body.id
    }, {
        completed: true
    })

    res.json({
        msg: "Todo marked as completed"
    })
})

app.listen(3000);