import passport from 'passport';

export const loginUser = (req, res) => {
  if(req.body.username, req.body.password) {
    passport.authenticate('local', function(error, user) {
      if(error) {
        return res.status(500).json({message: error});
      }
      req.logIn(user, function(error) {
        if(error) {
          return res.status(500).json({message: error});
        }
        return res.json({message: 'Successful login'})
      })
    })(req, res);
  } else {
    return res.status(400).json({message: 'Username or password is missing'});
  }
}

export const logoutUser = (req, res) => {
  if(req.isAuthenticated()) {
    req.logout(function(error) {
      if(error) {
        return res.status(500).json({message: error.message});
      }
      return res.json({message: `Successful logout`})
    });
  } else {
    return res.status(403).json({message: 'User was not logged in'});
  }
}

export const userStatus = (req, res) => {
  if(req.isAuthenticated()) {
    return res.send(req.session.passport);
  } else {
    return res.status(403).json({message: 'User was not logged in'});
  }
}

