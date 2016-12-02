class API::V1::BaseController < ApplicationController
  require 'proof'

  clear_respond_to
  respond_to :json

  private

    def user_not_authorized
      render json: errors_json("Not Authorized"), status: 401
    end

    def current_user
      return Thread.current[:current_user] if Thread.current[:current_user]
      @current_user if @current_user
    end

    def errors_json(messages)
      { errors: [*messages] }
    end
end
