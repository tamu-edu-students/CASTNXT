class Slide
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :event
  belongs_to :talent
  has_and_belongs_to_many :clients
  has_one :form
  field :curated, type: Boolean
end