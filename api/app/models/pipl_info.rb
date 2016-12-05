require 'pipl'
Pipl.configure do |c|
  c.api_key = 'BUSINESS-PREMIUM-9n8yhi1dxinxp0c4cyaddfsy'
  c.show_sources = 'all'
  c.minimum_probability = 0.0000001
  c.minimum_match = 0.0004
  c.strict_validation = true
end

class PiplInfo < ApplicationRecord
  belongs_to :user, class_name: "User", foreign_key: "fb_id", primary_key: 'uid'

  def self.from_omniauth(auth)
    where(fb_id: auth.uid).first_or_create do |pipl_info|
      response = Pipl::client.search email: auth.info.email
      pipl_info.base_data = response.person.to_json
    end
  end

  def self.from_basic(id, first_name, last_name)
    where(fb_id: id).first_or_create do |pipl_info|
      response = Pipl::client.search first_name: first_name, last_name: last_name
      if response.person
        pipl_info.base_data = response.person.to_json
      elsif response.possible_persons
        pipl_info.base_data = response.possible_persons
      end
    end
  end
end
