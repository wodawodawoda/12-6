const url = 'https://restcountries.eu/rest/v2/name/';
const countriesList = $('#countriesList');
const filter = '?fields=name;capital;currencies';

$('#country-name')[0].addEventListener("keyup", function(event) {
	event.preventDefault();
	searchCountries();
});
$('.search__btn').click(searchCountries);

// User country - empty input value
let userCountry;
$.getJSON('https://ipinfo.io/', function(resp) {
	$.getJSON('https://restcountries.eu/rest/v2/alpha/' + resp.country, function(resp) {
		userCountry = resp.name;
	});
});

function searchCountries() {
	let countryName = $('#country-name').val();
	if (!countryName.length) countryName = userCountry;

	$.getJSON(url + countryName, showCountriesList);

}

function showCountriesList(resp) {
	countriesList.empty();

	resp.forEach(function(item) {
		// HTML items
		const $item = $('<div>').addClass('list__item'),
			$flag = $('<img>').addClass('list__flag'),
			$name = $('<p>').addClass('list__name'),
			$description = $('<h3>').addClass('list__description'),
			$table = $('<table>').addClass('list__table table'),
			$body = $('<tbody>').addClass('table__body'),
			$trh = $('<tr>').addClass('table__row'),
			$trb = $('<tr>').addClass('table__row'),
			$head = $('<thead>').addClass('table__head');

		// Build table without data
		countriesList.append(
			$item.append(
				$flag.attr('src', item.flag),
				$name.append(item.name),
				$description.append('Description'),
				$table.append(
					$head.append($trh),
					$body.append($trb)
				)
			)
		);
		// Add data to table
		const data = ['capital', 'population', 'region'];

		data.forEach(function(item2) {
			const $th = $('<th>').addClass('table__item'),
				$td = $('<td>').addClass('table__item');
			if (item[item2]) {
				$trh.append($th.append(item2));
				$trb.append($td.append(item[item2]));
			}
		});
	});
}