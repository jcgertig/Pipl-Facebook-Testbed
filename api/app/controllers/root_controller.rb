class RootController < ApplicationController
  skip_before_action :verify_authenticity_token

  clear_respond_to
  respond_to :json

  def index
    render json: { errors: ['Please check API documentation'], user: !current_user.nil? }
  end

  def signout
    sign_out(current_user)
  end
end
