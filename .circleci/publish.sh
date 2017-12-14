cd .. && git clone git@github.com:quantmind/d3-view-components.git gh-pages
cd gh-pages && git checkout -b gh-pages origin/gh-pages
rm -rf *
cp -a ../website/build/. .
rm -rf .tmp
git add * && git commit -a -m "new site release [ci skip]" && git push origin gh-pages
cd .. && rm -rf gh-pages
cd website
