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
    "http://localhost:4000/login?t=#{token.token}"
  end

  def after_sign_out_path_for(resource)
    "http://localhost:4000"
  end
end
