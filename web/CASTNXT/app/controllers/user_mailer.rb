class UserMailer < ApplicationMailer
    default from:'fashionxtllc@gmail.com'
    def send_welcome(email, id)
      link = ENV['HEROKU_URL'] || 'http://0.0.0.0:3000'
      mail(to: email, subject: "Welcome", body:"<!DOCTYPE html><body><div>Please click this link to validate your account: #{link}/validation/#{id}  ....</div></body>", content_type: "text/html")
    end
    
    def client_assigned(email)
     mail(to: email, subject: "Talent Assigned to you", body:"<!DOCTYPE html><body>Hi, you have been assigned a talent for an upcoming event. Please log in to see more details.<div></div></body>", content_type: "text/html")
    end
end