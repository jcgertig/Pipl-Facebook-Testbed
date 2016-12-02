class Api::V1::SessionsController < API::V1::BaseController

  def signout
    sign_out(current_user)
    render json: { message: 'success' }, status: 200
  end

private

  def signup_params
    params.permit(:email, :password)
  end
end
