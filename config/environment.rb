Encoding.default_internal = 'UTF-8'
require 'rubygems'
require 'bundler/setup'
Bundler.require

puts "Starting in #{Sinatra::Base.environment} mode..."

class App < Sinatra::Base

  set :method_override, true
  set :public,          'public'

  configure :development do
    use Rack::ShowExceptions
    use Rack::CommonLogger
    Bundler.require :development
  end

  configure :production do
    use Rack::CommonLogger
  end

  not_found do
    erb :'404'
  end

  error do
    erb :'500'
  end
end

require File.join('.', 'app.rb')

STDOUT.sync = true