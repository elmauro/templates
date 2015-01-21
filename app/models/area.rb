class Area < ActiveRecord::Base
	belongs_to :application
	has_many :templates
end
