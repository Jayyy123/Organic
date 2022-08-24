"use strict";
const axios = require("axios");

const app = require("express").Router();
let SessionService = require("../../services/SessionService");
const ValidationService = require("../../services/ValidationService");
const db = require("../../models");
const helpers = require("../../core/helpers");

const role = 1;

app.get("/admin/terminate/", SessionService.verifySessionMiddleware(role, "admin"), async function (req, res, next) {
  try {
    let session = req.session;
    let paginateListViewModel = require("../../view_models/terminate_view_model");

    var viewModel = new paginateListViewModel(db.terminate, "Terminate List", session.success, session.error, "/admin/terminate");

    viewModel._column = ["ID", "Message", "Counter"];
    viewModel._readable_column = ["ID", "Message", "Counter"];

    // Check for flash messages
    const flashMessageSuccess = req.flash("success");
    if (flashMessageSuccess && flashMessageSuccess.length > 0) {
      viewModel.success = flashMessageSuccess[0];
    }
    const flashMessageError = req.flash("error");
    if (flashMessageError && flashMessageError.length > 0) {
      viewModel.error = flashMessageError[0];
    }

    viewModel.set_id("1");
    // viewModel.set("terminate");

    let where = helpers.filterEmptyFields({
      id: viewModel.get_id(),
      name: viewModel.get_message(),
    });

    viewModel.set_total_rows(1);
    
    const list = await db.terminate.getMessage();
    viewModel.set_message(list.message || 'something went wrong');
    viewModel.set_counter(list.counter);
    console.log('---',list.message)
    viewModel.set_list(list);
    console.log('\n--->',viewModel.get_counter())

    return res.render("admin/Terminate", viewModel);
  } catch (error) {
    console.error(error);
    viewModel.error = error.message || "Something went wrong";
    return res.render("admin/Terminate", viewModel);
  }
});


// APIS
app.get("/api/v1/terminate", async function (req, res, next) {
  try {
    const messages = await db.terminate.findAll();

    const response = { data: messages[0] };

    return res.status(201).json({ success: true, data: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
});
app.post("/api/v1/terminate", async function (req, res, next) {
  try {
    const terminateObj = {...req.body}
    const ress = db.terminate.ud(terminateObj)

    const response = await ress;
    
    return res.redirect('/admin/terminate');
  } catch (error) {
    res.status = 500
    res.json({ success: false, message: error })
    return res;
  }
});
module.exports = app;
