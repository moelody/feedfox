import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
	html {
		font-size: 16px;
		box-sizing: border-box;
	}

	*, *:before, *:after {
		padding: 0;
		margin: 0;
		box-sizing: inherit;
	}

	body {
		margin: 1rem 1rem 1rem 0;
		margin-left: 6%;
		font-family: ${(props) => props.theme.font};
		background: ${(props) => props.theme.bg};
		color: ${(props) => props.theme.color};
		line-height: 1.7;
	}

	body::-webkit-scrollbar {
			width: 0.25rem;
	}

	body::-webkit-scrollbar-track {
		background: ${(props) => props.theme.bg};
	}

	body::-webkit-scrollbar-thumb {
		background: ${(props) => props.theme.accent};
	}

	h1, h2, h3, h4, h5, h6 {
		font-weight: normal;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	li {
		list-style-type: none;
	}

	.tag {
		display: block;
		text-transform: uppercase;
		color: ${(props) => props.theme.light};
		letter-spacing: 1px;
		margin-bottom: 1.5rem;
  }
  
  .mainview {
    margin-top: 15px;
    margin-right: 30px;
  }

  input:focus, textarea:focus, button:focus {
		outline: none;
	}

@media screen and (max-width: 530px) {
	body {
		margin-left: 3%;
		font-size: 0.95rem;
  }
  .mainview {
    margin: auto;
  }
}

@media screen and (max-width: 400px) {
	body {
		margin-left: 3%;
		font-size: 0.9rem;
	}
  .mainview {
    margin: auto;
  }
}
`;
