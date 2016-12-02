class UserSerializer < ActiveModel::Serializer
  attributes :id, :uid, :active, :email, :name, :profile_image, :pipl_data,
    :fb_token, :token_expires

  def full_name
    object.name
  end

  def token_expires
    object.token_expires.to_i
  end

  def pipl_data
    return {} unless object.pipl_info
    PiplSerializer.new(object.pipl_info).attributes
  end
end
