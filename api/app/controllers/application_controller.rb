class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  def token
    secret = Rails.application.secrets.secret_key_base
    Proof::Token.from_data({user_id: current_user.id}, false, secret)
  end

  def user_token user
    secret = Rails.application.secrets.secret_key_base
    Proof::Token.from_data({user_id: user.id}, false, secret)
  end

  def after_sign_in_path_for(resource)
    puts "file:///Users/jonathangertig/sidework/pipl-facebook-desktop/app/app.html#/login?t=#{token.token}"
    "file:///Users/jonathangertig/sidework/pipl-facebook-desktop/app/app.html#/login?t=#{token.token}"
  end

  def after_sign_out_path_for(resource)
    "file:///Users/jonathangertig/sidework/pipl-facebook-desktop/app/app.html#/"
  end
end
