class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      @user.update_attributes({
        fb_token: request.env["omniauth.auth"].credentials.token,
        token_expires: request.env["omniauth.auth"].credentials.expires_at
      });
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
    else
      redirect_to "http://localhost:4000/login"
    end
  end

  def failure
    redirect_to root_path
  end
end
