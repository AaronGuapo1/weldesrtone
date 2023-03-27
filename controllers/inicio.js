module.exports = async (req, res) => {
    let role = "viewer";
    let logged = false;
    if (req.session?.passport?.user != undefined) {
        role = req.session.passport.user.role;
        logged = true;
    }

    const id = req.session?.passport?.id;

    res.render("inicio", { roles: role, loggedIn: logged });
};
