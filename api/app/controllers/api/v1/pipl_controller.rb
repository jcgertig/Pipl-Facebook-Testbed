class Api::V1::PiplController < API::V1::BaseController

  before_action only: [:find] do
    require_proof authenticatable: :User
  end

  def find
    @pipl = PiplInfo.from_basic(params[:fb_id], params[:first_name], params[:last_name])
    render json: @pipl, serializer: PiplSerializer, status: :ok
  end

end
