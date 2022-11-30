class Talent
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :talentName, type: String
  field :gender, type: String
  field :birthDate, type: String
  field :paymentLink, type: String
  field :email, type: String
  field :city, type: String
  field :state, type: String
  
  field :name, type: String
  # field :email, type: String
  field :is_valid, type: Boolean
  field :talentData, type: String
  
  has_many :slides
end
