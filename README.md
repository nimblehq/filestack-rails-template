# Filestack clone with Rails Active Storage
A brand new feature of Rails 5.2 is [Active Storage](http://edgeguides.rubyonrails.org/active_storage_overview.html) which adds upload functionality out-of-the-box inside Rails  (disk but also cloud storage solutions such as Amazon S3).

The objective is to create a small library (JS or ruby gem) using Rails 5.2 and Active Storage to learn how to use it and see if it makes sense to use in future projects.

Create a Filestack-like JS library to store documents and images to Amazon S3 (see example: https://www.filestack.com/features/file-uploader):
- The library will take care of creating a modal where users can pick and see the upload progress (possible with [Active Storage](http://edgeguides.rubyonrails.org/active_storage_overview.html#example))
- The modal can be opened by just clicking on a button. It's a replacement of the default input file.

## Usage

Clone the repository

```
git clone git@github.com:nimbl3/filestack-rails-template.git
```

## Installing

Install bundler

```
gem install bundler
```

then install gem

```
bundle install
```

## Running

```
rails s
```

Have fun!!


## License

This project is Copyright (c) 2014-2017 Nimbl3 Ltd. It is free software,
and may be redistributed under the terms specified in the [LICENSE] file.

[LICENSE]: /LICENSE

## About

![Nimbl3](https://dtvm7z6brak4y.cloudfront.net/logo/logo-repo-readme.jpg)

This project is maintained and funded by Nimbl3 Ltd.

We love open source and do our part in sharing our work with the community!
See [our other projects][community] or [hire our team][hire] to help build your product.

[community]: https://github.com/nimbl3
[hire]: https://nimbl3.com/
