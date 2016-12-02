class Api::V1::UsersController < API::V1::BaseController

  before_action only: [:me] do
    require_proof authenticatable: :User
  end

  def me
    render json: current_user, serializer: UserSerializer, status: :ok
  end

private

end
