const site = require("../model/site");

exports.register = async (req, res) => {
    const details = {};

    details.siteName = req.body.name;
    details.customer = req.body.customer;
    details.designer = req.body.designer;
    details.supervisor = req.body.supervisor;
    details.address = req.body.address;
    details.date = req.body.date;

    let flag = true;
    let error = "Please Enter Site Name";

    if (!details.siteName) {
        flag = false;
    }
    if (flag) {
        const response = await site.register(details);
        if (response) {
            res.status(200).json({ status: true, message: "Site Registered Successfully" })
        }
        else {
            res.status(200).json({ status: false, message: "Something Went Wrong" });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}

exports.update = async (req, res) => {
    const { site_code } = req.params;

    const siteName = req.body.name;
    const status = req.body.status;
    const customer = req.body.customer;
    const designer = req.body.designer;
    const supervisor = req.body.supervisor;
    const address = req.body.address;
    const date = req.body.date;

    let flag = true;
    let error = "Please Enter All Details";
    if (!siteName) {
        flag = false;
    }
    if (flag && !status) {
        flag = false;
    }
    if (flag) {
        const check = await site.siteCodeCheck(site_code);
        if (check) {
            const response = await site.updateSite(siteName, status, site_code, customer, designer, supervisor, address, date);
            if (response) {
                res.status(200).json({ status: true, message: "Site Updated Successfully" });
            }
            else {
                res.status(200).json({ status: false, message: "Something Went Wrong" });
            }
        }
        else {
            res.status(200).json({ status: false, message: "Invalid Site Code" });
        }
    }
    else {
        res.status(200).json({ status: false, message: error });
    }
}

exports.getAll = async (req, res) => {
    const sites = await site.readAll();
    if (sites.status) {
        if (sites.data === undefined) {
            res.status(200).json({ status: true, message: sites.message });
        }
        else {
            res.status(200).json({ status: true, data: sites.data });
        }
    }
    else {
        res.status(200).json({ status: false, message: sites.error });
    }
}

exports.getAllPending = async (req, res) => {
    const sites = await site.readAllPending();
    if (sites.status) {
        if (sites.data === undefined) {
            res.status(200).json({ status: true, message: sites.message });
        }
        else {
            res.status(200).json({ status: true, data: sites.data });
        }
    }
    else {
        res.status(200).json({ status: false, message: sites.error });
    }
}