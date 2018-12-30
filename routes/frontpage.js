let i = 0;

exports.get = async function(ctx, next) {
  const isAuthenticated = ctx.isAuthenticated();
  console.log(isAuthenticated);
  if (isAuthenticated) {
    i++;
    if (i % 5 === 0) {
      ctx.flash('success', 'You won! Enter your credit card to get a prize');
    }
    ctx.body = ctx.render('welcome.pug', {user: ctx.state.user});
  } else {
    ctx.body = ctx.render('login.pug');
  }
};
