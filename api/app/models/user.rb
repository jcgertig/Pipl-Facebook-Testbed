class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :validatable,
    :omniauthable, :omniauth_providers => [:facebook]

  enum role: [ :user ]

  has_one :pipl_info, class_name: "PiplInfo", foreign_key: "fb_id", primary_key: "uid"

  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }

  fuzzily_searchable :name

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      PiplInfo.from_omniauth(auth)
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.name = auth.info.name
      user.profile_image = auth.info.image
    end
  end
end
