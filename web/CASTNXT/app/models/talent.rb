class Talent
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :name, type: String
  field :email, type: String
  field :is_valid, type: Boolean
  field :talentData, type: String
  
  has_many :slides
end
