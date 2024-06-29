let areas;

// JSON 파일을 불러옵니다.
fetch('area.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // 데이터를 JSON 형식으로 변환합니다.
    })
    .then(data => {
        areas = data; // 데이터를 전역 변수인 areas에 저장합니다.
        console.log('Data loaded:', areas); // 데이터를 잘 불러왔는지 콘솔에 출력합니다.
    })
    .catch(error => console.error('Fetching error:', error));

const recommendBtn = document.getElementById('recommend-btn');
const randomAreaDisplay = document.getElementById('location-name');
const balloon = document.getElementById('balloon');
const searchLinkDiv = document.getElementById('search-link');
const searchResults = document.getElementById('search-results'); // 검색 결과 링크 요소

recommendBtn.addEventListener('click', function() {
    if (!areas) {
        console.error('Areas data is not loaded yet.');
        return;
    }
    const randomIndex = Math.floor(Math.random() * areas.length);
    const randomArea = areas[randomIndex];

    let displayText;
    let searchQuery;
    if (randomArea['시 / 군']) {
        displayText = `우리의 여행지는 ${randomArea['대분류']} ${randomArea['시 / 군']}`;
        searchQuery = `${randomArea['대분류']} ${randomArea['시 / 군']} 맛집`;
    } else {
        displayText = `우리의 여행지는 ${randomArea['대분류']}`;
        searchQuery = `${randomArea['대분류']} 맛집`;
    }
    randomAreaDisplay.textContent = displayText;
    balloon.style.display = 'block';

    // 네이버 검색 결과로 이동할 수 있는 링크 생성
    const searchURL = `https://search.naver.com/search.naver?query=${encodeURIComponent(searchQuery)}`;
    searchResults.href = searchURL;
    searchLinkDiv.style.display = 'block';
});
